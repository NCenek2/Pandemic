import { createContext, useCallback, useRef, useState } from "react";
import type { ChildrenType } from "../Types/ChildrenType";

type AlertType = "danger" | "warning" | "success" | "info";

const useAlertContext = () => {
  const [alert, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>("danger");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resolverRef = useRef<(() => void) | null>(null);

  const hideAlert = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setShowAlert(false);
    setAlertMessage("");

    // Resolve the awaiting Promise
    if (resolverRef.current != null) {
      resolverRef.current();
      resolverRef.current = null;
    }
  }, []);

  const setAlert = useCallback(
    (message: string, type: AlertType = "danger") => {
      return new Promise<void>((resolve) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);

        resolverRef.current = resolve;

        timeoutRef.current = setTimeout(() => {
          hideAlert();
        }, 1500);
      });
    },
    [hideAlert],
  );

  return { alertType, alert, setAlert, hideAlert, showAlert };
};

export type UseAlertContextType = ReturnType<typeof useAlertContext>;

const initialAlertContext: UseAlertContextType = {
  alertType: "danger",
  alert: "",
  showAlert: false,
  setAlert: () => Promise.resolve(),
  hideAlert: () => {},
};

export const AlertContext =
  createContext<UseAlertContextType>(initialAlertContext);

export const AlertProvider = ({ children }: ChildrenType) => {
  return (
    <AlertContext.Provider value={useAlertContext()}>
      {children}
    </AlertContext.Provider>
  );
};
