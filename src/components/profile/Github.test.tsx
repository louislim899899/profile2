import React from 'react';
import { render, screen } from '@testing-library/react';
import Github from './Github';
import Enzyme, { shallow, mount, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import Adapter from "enzyme-adapter-react-16";
import { GithubLogo } from '../logo/Logo';
configure({ adapter: new Adapter() });


// test('renders learn react link', () => {
//   render(<Github />);
//   const linkElement = screen.getByText(/View Github projects/i);
//   expect(screen.getByLabelText(/learn/)).toBeInTheDocument();

//   expect(linkElement).toBeInTheDocument();
//   expect(linkElement).toHaveTextContent('$100.00');
// });

test("renders without crashing", () => {
  const wrapper = shallow(<Github />);
  const elem = <p className='mb-4'>View Github projects</p>;
  expect(wrapper.contains(elem)).toEqual(true);
});

test("renders Github logo", () => {
  const wrapper = shallow(<Github />);
  expect(wrapper.containsMatchingElement(<GithubLogo />)).toEqual(true);
});