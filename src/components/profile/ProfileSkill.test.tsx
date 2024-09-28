import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';

import Adapter from "enzyme-adapter-react-16";
import ProfileSkill from './ProfileSkill';
import { render, screen } from '@testing-library/react';
import { VueLogo } from '../logo/Logo';
configure({ adapter: new Adapter() });


// test('renders learn react link', () => {
//   render(<Github />);
//   const linkElement = screen.getByText(/View Github projects/i);
//   expect(screen.getByLabelText(/learn/)).toBeInTheDocument();

//   expect(linkElement).toBeInTheDocument();
//   expect(linkElement).toHaveTextContent('$100.00');
// });

// describe("test html component is rendered", () => {
//   it("renders svg correctly", () => {
//     const wrapper = mount(<ProfileSkill />);
//     // expect(wrapper.find('svg')).toBe(true);
//     // console.log(wrapper.debug());
//   });
// })

describe('Test SVG appear', () => {


  it('test required svg', () => {
    // const view = render(<ProfileSkill/>);
    const wrapper = shallow(<ProfileSkill/>);
    // const { asFragment } = render(<ProfileSkill />)
    // console.log(asFragment);
    // const elem = wrapper.find('svg')
    // expect(elem.length).toBe(1);

    // expect(wrapper.findChild().length).toEqual(1)
    expect(wrapper.containsMatchingElement(<VueLogo />)).toEqual(true);


    // console.log(screen.debug());
//     expect(component.root.findByType('a').props.href).toEqual(
//       'https://reactjs.org/'
// ); 
});
});


