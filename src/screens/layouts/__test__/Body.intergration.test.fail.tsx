import React from "react"
import { act, fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react"
import Body from "../Body"
import { Provider } from "react-redux"
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom"
import store from '@/services/store';
import App from "../../../App"
import HomeScreen from "../../HomeScreen"
import AboutScreen from "../../AboutScreen"
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event"

/*
****
this test considered failed. there is no solution for testing the dom change yet
*/


const view = render(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>          
  </Provider>
)

beforeEach(() => {
    const myView = view;
})

describe("testing switching page", () => {

    it("to About page", async () => {
    //     <MemoryRouter initialEntries={['/']}>
    //   <Route path="/">
    //     <HomeScreen />
    //   </Route>
    //   <Route path="/about">
    //     <AboutScreen />
    //   </Route>
    // </MemoryRouter>

        // const link = screen.getByText('About');
        const link = screen.getByTestId('About');

        // await act(async () => {
        //     fireEvent.click(link);
        //     // Optionally, you can add some delay or other async operations here if needed
        //   });
        fireEvent.click(link);

        // // 1- Mocking the hook using jest.fn
        // const mockedUsedNavigate = jest.fn();

        // // 2- Mock the library
        // jest.mock("react-router-dom", () => ({

        // // 3- Import non-mocked library and use other functionalities and hooks
        // ...(jest.requireActual("react-router-dom") as any),

        // // 4- Mock the required hook
        // useNavigate: () => mockedUsedNavigate
        // }));

        // Optionally, you can add some delay or other async operations here if needed
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        

        // console.log(prettyDOM());

        await waitFor(() => {
            // Perform assertions on the updated DOM state
            // expect(screen.getByText(/About Me/)).toBeInTheDocument();
            expect(window.location.pathname).toBe('/about');
            // console.log(prettyDOM());
          });


        

        // fireEvent.click(link);
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // console.log(prettyDOM());


        // expect(screen.getByText(/About Me/)).toBeInTheDocument();
    })

    // it('solution from online', async () => {
    //     const history = createMemoryHistory();

    // const location = useLocation()
    // render(
    //     <BrowserRouter location={history.location} navigator={history}>
    //     <App />
    //     </BrowserRouter>
    // );
    // const user = userEvent.setup();
    // // verify page content for expected route
    // // often you'd use a data-testid or role query, but this is also possible
    // expect(screen.getByText(/you are home/i)).toBeInTheDocument();

    // await user.click(screen.getByText(/about/i));

    // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
    // })
})