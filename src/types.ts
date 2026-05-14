export interface User {
  username: string;
  fName: string;
  mName: string;
  lName: string;
  fullName: string;
  staffUnit: string;
  email: string;
  lnm_email: string;
  gender: 'Male' | 'Female';
  balance: {
    total: number;
    taken: number;
    remaining: number;
  };
}

export interface LeaveRequest {
  id: string;
  type: string;
  sd: string; // Start Date
  ed: string; // End Date
  no_leave: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export type LeaveType = 'Annual' | 'Paternity' | 'Maternity' | 'Wedding' | 'Others';
