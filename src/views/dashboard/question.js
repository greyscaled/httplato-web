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
import React from 'react'
import PropTypes from 'prop-types'

export const Question = ({ question }) => {
  const { type } = question
  const { blocks } = question.content.question
  let options
  let keys
  if (type === 'mc') {
    options = question.content.options
    keys = Object.keys(options.values)
  }
  let title = `Question`
  if (type === 'tf') title = `True or False`
  else if (type === 'fill') title = `Fill In The Blank`
  else if (type === 'sa') title = `Short Answer`
  else if (type === 'mc') title = `Multiple Choice`
  return (
    <div>
      <h2 style={{
        backgroundColor: '#c60055',
        padding: '1rem',
        textAlign: 'center'
      }}>
        {title}
      </h2>
      <div className='question__content'>
        {
          blocks.map((block, i) => {
            switch (block.type) {
              case 'tf':
                return (
                  <div className='question__content__item--bold' key={i}>
                    True or False:&nbsp;
                  </div>
                )
              case 'fill':
                return (
                  <div className='question__content__blank input-field' key={i}>
                    <input style={{ fontSize: '1.5rem' }} type='text' />
                  </div>
                )
              case 'text':
              case 'sa':
                return <div className='question__content__item' key={i}>{block.content}</div>
              default: return <div />
            }
          })
        }
        {
          type === 'tf' &&
          <div className='switch'>
            <label>
              False
              <input type='checkbox' />
              <span className='lever' />
              True
            </label>
          </div>
        }
        {
          type === 'sa' &&
          <div className='input-field'>
            <textarea className='materialize-textarea' />
          </div>
        }
        {
          type === 'mc' &&
          <ul className='collection'>
            {
              keys.map(k => {
                let value = options.values[`${k}`]
                return <li className='collection-item question__content__mc' key={value}>{value}</li>
              })
            }
          </ul>
        }
      </div>
    </div>
  )
}

Question.propTypes = {
  question: PropTypes.shape({}).isRequired
}

export default Question
