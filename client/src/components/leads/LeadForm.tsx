import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Lead, LeadPayload, LeadSource, LeadStatus } from '../../types/lead.types';
import { LEAD_SOURCES, LEAD_STATUSES } from '../../utils/constants';

interface LeadFormProps {
  lead?: Lead | null;
  isSubmitting: boolean;
  error?: string | null;
  onCancel: () => void;
  onSubmit: (payload: LeadPayload) => Promise<void>;
}

interface LeadFormErrors {
  name?: string;
  email?: string;
}

const defaultPayload: LeadPayload = {
  name: '',
  email: '',
  status: 'New',
  source: 'Website',
};

export function LeadForm({
  lead,
  isSubmitting,
  error,
  onCancel,
  onSubmit,
}: LeadFormProps): JSX.Element {
  const [form, setForm] = useState<LeadPayload>(defaultPayload);
  const [errors, setErrors] = useState<LeadFormErrors>({});

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      });
    } else {
      setForm(defaultPayload);
    }
    setErrors({});
  }, [lead]);

  const validate = (): boolean => {
    const nextErrors: LeadFormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Name must be at least 2 characters';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error ? <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div> : null}
      <Input
        label="Lead name"
        value={form.name}
        error={errors.name}
        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
      />
      <Input
        label="Email"
        type="email"
        value={form.email}
        error={errors.email}
        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Status"
          value={form.status}
          onChange={(event) =>
            setForm((current) => ({ ...current, status: event.target.value as LeadStatus }))
          }
        >
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
        <Select
          label="Source"
          value={form.source}
          onChange={(event) =>
            setForm((current) => ({ ...current, source: event.target.value as LeadSource }))
          }
        >
          {LEAD_SOURCES.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save lead'}
        </Button>
      </div>
    </form>
  );
}
