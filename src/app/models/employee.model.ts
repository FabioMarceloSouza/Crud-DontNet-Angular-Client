export interface Employee {
  id: string,
  name: string,
  email: string,
  phone: string,
  salary: number,
  departmentId: string,
  department: {
    name: string
  }
}
