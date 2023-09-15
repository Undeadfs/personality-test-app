import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private dbUrl = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) {
    console.log(this.dbUrl)
  }

  getQuestionsAndOptions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.dbUrl);
  }
}

