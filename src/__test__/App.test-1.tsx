import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Enzyme, { shallow, mount, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // const linkElement = screen.getByLabelText(/leaarn/i);
//   // expect(screen.getByLabelText(/learn/)).toBeInTheDocument();

//   // expect(linkElement).toBeInTheDocument();
//   // expect(linkElement).toHaveTextContent('$100.00');
// });

// test("renders without crashing", () => {
//   const wrapper = shallow(<App />);
//   const elem = <div aria-labelledby="learn">learn react</div>;
//   expect(wrapper.contains(elem)).toEqual(true);
// });

// it('renders correctly enzyme', () => {
//   const wrapper = shallow(<App />)

//   expect(toJson(wrapper)).toMatchSnapshot();
// });