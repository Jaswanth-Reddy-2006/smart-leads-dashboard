export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data: T;

  constructor(data: T, message = 'Success') {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
