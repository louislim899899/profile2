import { render } from "@testing-library/react";
import React, {Component} from "react";
import ProfileScreen from "../HomeScreen";

test('Render Image Profile', () => {
    render(<ProfileScreen/>)
})