import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from "enzyme-adapter-react-16";
import ProfileIntro from './ProfileIntro';
configure({ adapter: new Adapter() });


// test('renders learn react link', () => {
//   render(<Github />);
//   const linkElement = screen.getByText(/View Github projects/i);
//   expect(screen.getByLabelText(/learn/)).toBeInTheDocument();

//   expect(linkElement).toBeInTheDocument();
//   expect(linkElement).toHaveTextContent('$100.00');
// });
test("renders text correctly", () => {
  const wrapper = shallow(<ProfileIntro />);
  expect(wrapper.find('h1').text()).toContain('Louis');
  expect(wrapper.find('p').text()).toContain('A passionate learner');
});


