import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

export default function useClickOutsideHandler(ref:React.RefObject<HTMLDivElement>, action:AnyAction) {
    const dispatch = useDispatch()

    useEffect(() => {

      function handleClickOutside(event:any) { // unknown type
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(action)
          // alert('click outside')
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [action, dispatch, ref]);
}
