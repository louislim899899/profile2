import React from "react";
import AboutScreen from "./AboutScreen"

import Adapter from "enzyme-adapter-react-16";
import { render, screen } from "@testing-library/react";


describe('About check text', () => {
    it('Check about text', () => {
        render(<AboutScreen />)

        // const element = screen.getByText('Programming knowledge is wide and I am still studying during my leisure time. Now, what fascinating me is the best practices to build a scalable project used in large enterprise such as CI/CD, agile, TDD, better OOP, design structure and refactoring skill.');
        const element = screen.getByText(/Programming knowledge/);

          
        // expect(screen.getByText('/Improving people life/')).toBeInTheDocument(); 
        expect(element).toBeInTheDocument();        
       
    })
}) 