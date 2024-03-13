export class Ticket {
  id?: number;
  title?: string;
  description?: string;
  updated_at?: string;
  created_at?: string;
  kinds?: { id?: number, name?:string };
  users?: { id?: number, name?:string  };
  projects?: { id?: number, name?:string  };
  categories?: { id?: number, name?:string  };
  priorities?: { id?: number, name?:string  };
  status?: { id?: number, name?:string  };
}
