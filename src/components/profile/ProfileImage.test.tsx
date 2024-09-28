import React from 'react';
import { shallow, configure } from 'enzyme';
import img from "@/assets/images/man-123.png"

import Adapter from "enzyme-adapter-react-16";
import ProfileImage from './ProfileImage';
configure({ adapter: new Adapter() });


// test('renders learn react link', () => {
//   render(<Github />);
//   const linkElement = screen.getByText(/View Github projects/i);
//   expect(screen.getByLabelText(/learn/)).toBeInTheDocument();

//   expect(linkElement).toBeInTheDocument();
//   expect(linkElement).toHaveTextContent('$100.00');
// });
test("renders profile images", () => {
  const wrapper = shallow(<ProfileImage />);
  expect(wrapper.find("img").prop("src")).toEqual(img);
});


