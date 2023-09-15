import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';  

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class QuestionComponent implements OnInit {

  currentStep: number = 0;
  questions: Question[] = [];
  selectedOptions: number[] = [];
  totalScore: number = 0;
  personalityTrait: string = '';
  showResult: boolean = false;

  constructor(private questionService: QuestionService,
              private router: Router) { }

  ngOnInit(): void {
    this.questionService.getQuestionsAndOptions().subscribe((data) => {
      this.questions = data;
    });
  }

  selectOption(optionIndex: number): void {
    this.selectedOptions[this.currentStep] = optionIndex;}

  previousStep(): void {
    if (this.currentStep > 0) {
      const previousOption = this.selectedOptions[this.currentStep - 1];

      if (previousOption !== undefined) {
        const previousQuestion = this.questions[this.currentStep - 1];
        const previousAnswer = previousQuestion.options[previousOption];

        if (previousAnswer) {
          this.totalScore -= previousAnswer.points;
        }
      }

      this.currentStep--;
      console.log(this.totalScore)
    }
  }

  nextStep(): void {
    if (this.selectedOptions[this.currentStep] !== undefined) {
      const selectedQuestion = this.questions[this.currentStep];
      const selectedAnswer = selectedQuestion.options[this.selectedOptions[this.currentStep]];
      this.totalScore += selectedAnswer.points;
      console.log(this.totalScore)

      if (this.currentStep < this.questions.length - 1) {
        this.currentStep++;
      } else {
        if (this.totalScore >= 7) {
          this.personalityTrait = 'Extrovert';
        } else {
          this.personalityTrait = 'Introvert';
        }
        this.router.navigate(['/result', this.personalityTrait]);
      }
    }
  }
}
