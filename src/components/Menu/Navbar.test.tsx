import React from "react";
import { render, screen } from "@testing-library/react"
import Navbar from "./Navbar"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from '@/services/store';


describe("test navbar rendering", () => {

    it("test if all item in Menu showing", async () => {
        render(
          <Provider store={store}>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>          
        </Provider>
        )
        expect(screen.getByText('Contact')).toBeInTheDocument();

    }) 
}) 