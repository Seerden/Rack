import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "../helpers/theme/theme";
import { queryClient } from "../hooks/query-client";

const client = queryClient;

const App = () => {
   return (
      <>
         <QueryClientProvider client={client}>
            <ReactQueryDevtools
               initialIsOpen={false}
               panelProps={{
                  style: {
                     maxWidth: "40vw",
                     bottom: 0,
                     left: 0,
                  },
               }}
               position="bottom-right"
            />
            <RecoilRoot>
               <ThemeProvider theme={theme}>
                  <Router>
                     <main>
                        <Routes>
                           <Route path="/" element={<main>Welcome!</main>} />
                           <Route path="*" element={<div>404</div>} />
                        </Routes>
                     </main>
                  </Router>
               </ThemeProvider>
            </RecoilRoot>
         </QueryClientProvider>
      </>
   );
};

export default App;
