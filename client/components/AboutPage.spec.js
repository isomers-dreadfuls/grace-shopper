/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AboutPage} from './index'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AboutPage', () => {
  let aboutPage

  beforeEach(() => {
    aboutPage = shallow(<AboutPage />)
  })

  it('renders the title in an h1', () => {
    expect(aboutPage.find('h1').text()).to.be.equal('The Manifesto')
  })
})
