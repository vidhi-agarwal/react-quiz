import React from 'react';
import { QuizData } from './QuizData';

class Quiz extends React.Component {
	state = {
		userAnswer: null,
		currentQuestion: 0,
		options: [],
	};

	loadQuiz = () => {
		const { currentQuestion } = this.state;
		this.setState(() => {
			return {
				questions: QuizData[currentQuestion].question,
				options: QuizData[currentQuestion].options,
				answers: QuizData[currentQuestion].answer,
			};
		});
	};
	componentDidMount() {
		this.loadQuiz();
	}

	nextQuestionHandler = () => {
		this.setState({
			currentQuestion: this.state.currentQuestion + 1,
		});
	};
	componentDidUpdate(prevProps, prevState) {
		const { currentQuestion } = this.state;
		if (this.state.currentQuestion !== prevState.currentQuestion) {
			this.setState(() => {
				return {
					questions: QuizData[currentQuestion].question,
					options: QuizData[currentQuestion].options,
					answers: QuizData[currentQuestion].answer,
				};
			});
		}
	}

	render() {
		const { questions, options, currentQuestion,userAnswer } = this.state;
		return (
			<div className='App'>
				<h2>{questions}</h2>
				<span>
					{`Questions ${currentQuestion} out of ${QuizData.length - 1}`}
				</span>
				{options.map((option) => (
                    <p key={option.id} 
                    className={`ui floating message
                        ${userAnswer===option ? "selected" :null }
                    
                    `}>
						{option}
					</p>
				))}
				<button onclick={this.nextQuestionHandler}>Next</button>
			</div>
		);
		//return <div className='App'>{this.state.currentQuestion}</div>;
	}
}

export default Quiz;
