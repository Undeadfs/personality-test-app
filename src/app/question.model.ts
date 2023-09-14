export interface Question {
    id: number;
    text: string;
    options: Option[];
}
  
export interface Option {
    id: number;
    text: string;
    points: number;
}
  