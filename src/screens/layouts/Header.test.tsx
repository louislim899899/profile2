import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { Provider } from 'react-redux';
import store from '@/services/store';
import { BrowserRouter } from "react-router-dom";
import Header from "@/screens/layouts/Header";

let myComponent
let view = render (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>          
    </Provider>
)

beforeEach(() => {
  myComponent = view
});

afterEach(cleanup)

describe("test navbar function", () => {

    it("test if menu will show up if menu button is pressed ", async () => {

        // const elem = screen.getByRole('navigation');
        const menuElem = screen.getByTestId('navId');
        const menuButton = screen.getByTestId('navBtn');
        // expect(elem).toHaveStyle({ left: '-10em' });

        // const computedStyles = window.getComputedStyle(menuElem);
        // expect(menuElem).toHaveClass('nav--hide');

        fireEvent.click(menuButton);

        // await new Promise((resolve) => setTimeout(resolve, 2000));

        expect(menuElem).toHaveClass('nav--show');



        // expect(computedStyles.getPropertyValue('left')).toBe('-10em');

        // let s = '';
        // for(var i = 0; i < computedStyles.length; i++){
        //   s+=computedStyles[i] + ': ' + computedStyles.getPropertyValue(computedStyles[i])+';\n';
        // }
        // console.log(s);

        // expect(elem).toHaveStyle('padding-left: 1rem;');
        // expect(elem).toHaveProperty('left', '-10em');
        // expect(window.getComputedStyle(elem).getPropertyValue('left')).toBe('-10em');
        // const textElement = screen.getByText('Contact');
        // expect(textElement).toBeInTheDocument();
        

        // await userEvent.click(screen.getByText('Ls.'))

    }) 
}) 