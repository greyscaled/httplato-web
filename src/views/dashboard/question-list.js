/**
 * @license
 * Copyright (c) 2018 Vapurrmaid
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// deps
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAnswer } from '../../actions/dashboard'

// components
import Card from '../../components/cards/card'
import Question from './question'

export class QuestionList extends Component {
  constructor () {
    super()
    this.state = {
      answered: false,
      index: 0
    }
    this.handleAnswer = this._handleAnswer.bind(this)
    this.nextQuestion = this._nextQuestion.bind(this)
  }

  _handleAnswer () {
    const { answered, index } = this.state
    const { questionIds } = this.props
    const id = questionIds[index]
    if (!answered) {
      this.props.getAnswer(id)
      this.setState({ answered: true })
    } else {
      this.props.getAnswer() // clears answer
      this.nextQuestion()
    }
  }

  _nextQuestion () {
    const { index } = this.state
    const { questionIds } = this.props
    if (index < questionIds.length - 1) {
      this.setState({ answered: false, index: index + 1 })
    } else {
      this.setState({ answered: false, index: 0 })
    }
  }

  renderQuestion () {
    const { questionIds, questions } = this.props
    const { index } = this.state
    if (questionIds.length) {
      let i = questionIds[index]
      let question = questions[i]
      return <Question question={question} />
    } else {
      return <div>No More!</div>
    }
  }

  render () {
    const { answer } = this.props
    return (
      <Card className='question-list'>
        {this.renderQuestion()}
        { answer && <div>answer</div>}
        <div className='question-list__actions'>
          <button
            className='btn pink accent-2 waves-effect waves-light'
            onClick={this.handleAnswer}
          >
            {answer ? `Next` : `See Answer`}<i className='material-icons right'>send</i>
          </button>
        </div>
      </Card>
    )
  }
}

QuestionList.propTypes = {
  questionIds: PropTypes.array.isRequired,
  questions: PropTypes.shape({}).isRequired
}

const mapStateToProps = (state) => {
  return {
    answer: state.dashboard.answer,
    questionIds: state.dashboard.byId,
    questions: state.dashboard.byHash
  }
}

export default connect(mapStateToProps, { getAnswer })(QuestionList)
