import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import "./App.css";

interface CompanyProps {
  cover: string;
  descr: string;
  id: number;
  industry: string;
  logo: string;
  name: string;
  name_internal: string;
  slug: string;
  website: string;
}

interface ContactProps {
  email: string;
  name: string;
  phone: string;
  photo: string;
}

interface LocationProps {
  location: { text: string };
}

interface OwnerProps {
  email: string;
  id: number;
  name: string;
}

interface JobProps {
  company: CompanyProps;
  contact: ContactProps;
  descr: string;
  employment_type: string;
  experience: string;
  from_date: string;
  function: string;
  id: number;
  linkedInCompanyId: number;
  locations: LocationProps[];
  owner: OwnerProps;
  skills: string;
  slug: string;
  title: string;
  urls: { [key: string]: string };
}

function App() {
  const [data, setData] = useState<JobProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const darkTheme = createTheme({
    typography: { h1: { fontSize: "3rem" } },
    palette: { mode: "dark" },
  });

  useEffect(() => {
    fetch(
      "https://feed.jobylon.com/feeds/7d7e6fd12c614aa5af3624b06f7a74b8/?format=json"
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Typography variant="h1" color="common.white" padding="1rem">
          Available jobs
        </Typography>
        <List>
          {data?.map((job, key) => {
            return (
              <ListItem key={key}>
                <JobListing
                  company={job.company}
                  title={job.title}
                  employment_type={job.employment_type}
                  from_date={job.from_date}
                  location={job.locations[0].location.text}
                  href={job.urls["ad"]}
                  applyLink={job.urls["apply"]}
                >
                  {job.descr}
                </JobListing>
              </ListItem>
            );
          })}
        </List>
      </ThemeProvider>
    </div>
  );
}

export default App;
