import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  currentStep: number = 0;
  questions: Question[] = [];
  selectedOption: number | null = null;
  totalScore: number = 0;
  showResult: boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestionsAndOptions().subscribe((data) => {
      this.questions = data;
    });
  }

  selectOption(optionIndex: number): void {
    this.selectedOption = optionIndex;
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextStep(): void {
    if (this.selectedOption !== null) {
      const selectedQuestion = this.questions[this.currentStep];
      const selectedAnswer = selectedQuestion.options[this.selectedOption];
      this.totalScore += selectedAnswer.points;
      
      if (this.currentStep < this.questions.length - 1) {
        this.currentStep++;
      } else {
        this.showResult = true;
      }
    }
  }
}
