import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { createLead, deleteLead, exportLeads, updateLead } from '../api/leads.api';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Header } from '../components/layout/Header';
import { LeadDetailModal } from '../components/leads/LeadDetailModal';
import { LeadFilters } from '../components/leads/LeadFilters';
import { LeadForm } from '../components/leads/LeadForm';
import { LeadStats } from '../components/leads/LeadStats';
import { LeadTable } from '../components/leads/LeadTable';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Modal } from '../components/ui/Modal';
import { useLeads } from '../hooks/useLeads';
import { getPaginationPages } from '../hooks/usePagination';
import { useLeadsStore } from '../store/leadsStore';
import { Lead, LeadPayload } from '../types/lead.types';
import { useAuthStore } from '../store/authStore';

export function DashboardPage(): JSX.Element {
  const { reload } = useLeads();
  const { user } = useAuthStore();
  const { leads, pagination, filters, isLoading, error, setPage } = useLeadsStore();
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const isFiltered = Boolean(filters.status || filters.source || filters.search.trim());

  const handleSubmit = async (payload: LeadPayload): Promise<void> => {
    setIsSubmitting(true);
    setFormError(null);
    setOperationError(null);
    try {
      if (editingLead) {
        await updateLead(editingLead._id, payload);
      } else {
        await createLead(payload);
      }
      setIsFormOpen(false);
      setEditingLead(null);
      await reload();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Unable to save lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!leadToDelete) return;

    setIsDeleting(true);
    setOperationError(null);
    try {
      await deleteLead(leadToDelete._id);
      setLeadToDelete(null);
      await reload();
    } catch (err: unknown) {
      setOperationError(err instanceof Error ? err.message : 'Unable to delete lead');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = async (): Promise<void> => {
    setIsExporting(true);
    setOperationError(null);
    try {
      const blob = await exportLeads(filters);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `leads-export-${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setOperationError(err instanceof Error ? err.message : 'Unable to export leads');
    } finally {
      setIsExporting(false);
    }
  };

  const openCreate = (): void => {
    setEditingLead(null);
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEdit = (lead: Lead): void => {
    setEditingLead(lead);
    setFormError(null);
    setIsFormOpen(true);
  };

  const header = <Header onCreate={openCreate} onExport={handleExport} isExporting={isExporting} />;
  const showingStart = pagination && pagination.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const showingEnd = pagination ? Math.min(pagination.page * pagination.limit, pagination.total) : 0;

  return (
    <DashboardLayout header={header}>
      <div className="space-y-5">
        <LeadStats leads={leads} total={pagination?.total ?? 0} />
        <LeadFilters />
        {operationError ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {operationError}
          </div>
        ) : null}
        {error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
        ) : null}
        {!isLoading && leads.length === 0 ? (
          <section className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-800 p-8 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300">
              {isFiltered ? <Download size={34} /> : <Plus size={34} />}
            </div>
            <h2 className="text-xl font-semibold text-slate-50">{isFiltered ? 'No results' : 'No leads yet'}</h2>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              {isFiltered
                ? 'No leads match the active filters. Clear them or try a different search.'
                : 'Create your first lead to start tracking conversations and pipeline progress.'}
            </p>
            {!isFiltered ? (
              <Button className="mt-5" onClick={openCreate}>
                <Plus size={16} />
                Create lead
              </Button>
            ) : null}
          </section>
        ) : (
          <>
            <LeadTable
              leads={leads}
              isLoading={isLoading}
              onView={setViewLead}
              onEdit={openEdit}
              onDelete={setLeadToDelete}
            />
            {pagination ? (
              <footer className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-400">
                  Showing {showingStart}-{showingEnd} of {pagination.total} leads
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" disabled={!pagination.hasPrevPage} onClick={() => setPage(filters.page - 1)}>
                    Prev
                  </Button>
                  {getPaginationPages(filters.page, pagination.totalPages || 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === filters.page ? 'primary' : 'secondary'}
                      className="w-10 px-0"
                      onClick={() => setPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="secondary" disabled={!pagination.hasNextPage} onClick={() => setPage(filters.page + 1)}>
                    Next
                  </Button>
                </div>
              </footer>
            ) : null}
          </>
        )}
      </div>
      <Modal title={editingLead ? 'Edit lead' : 'Create lead'} isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <LeadForm
          lead={editingLead}
          isSubmitting={isSubmitting}
          error={formError}
          onCancel={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
      <ConfirmDialog
        title="Delete lead"
        description={
          leadToDelete
            ? `This will permanently delete ${leadToDelete.name}. This action cannot be undone.`
            : 'This action cannot be undone.'
        }
        confirmLabel="Delete lead"
        isOpen={Boolean(leadToDelete)}
        isLoading={isDeleting}
        onCancel={() => setLeadToDelete(null)}
        onConfirm={handleDelete}
      />
      <LeadDetailModal lead={viewLead} onClose={() => setViewLead(null)} />
    </DashboardLayout>
  );
}
