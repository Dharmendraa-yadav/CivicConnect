import { createContext, useContext, useState } from "react";
import sampleIssues from "../data/sampleIssues";

const IssueContext = createContext();

export function IssueProvider({ children }) {
  const [issues, setIssues] = useState(sampleIssues);

  const addIssue = (newIssue) => {
    setIssues((currentIssues) => [
      newIssue,
      ...currentIssues,
    ]);
  };

  return (
    <IssueContext.Provider value={{ issues, addIssue }}>
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  return useContext(IssueContext);
}