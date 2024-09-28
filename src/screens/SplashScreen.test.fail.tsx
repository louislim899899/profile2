import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import SplashScreen from "./SplashScreen"

// jest does not support svg function, eg: getTotalLength, getAnimation
let view = render(<SplashScreen/>)
const {container} = render(<SplashScreen />)
beforeEach(() => {
    const myComponent = view
})

afterEach(()=>cleanup)
describe("test splash screen", () => {
    it("check splash-screen element exist", () => {
        const splashScreen = container.getElementsByClassName('splash-screen')
        expect(splashScreen).toBeInTheDocument()
    }) 
})