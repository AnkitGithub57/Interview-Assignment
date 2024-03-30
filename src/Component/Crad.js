import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import axios from "axios";
import {
  IconPhoneCall,
  IconTrash,
  IconUserPlus,
  IconAt,
  IconWorld,
  IconStar,
  IconUserMinus,
} from "@tabler/icons-react";

import "../stylesheet/generic.css";

export default function Crad() {
  const [Users, setUsers] = useState([]);
  const handleFollow = (id) => {
    setUsers(
      Users.map((user) => {
        if (user.id === id) {
          return { ...user, toggled: !user.toggled };
        }
        return user;
      })
    );
  };

  const handleDelete = (id) => {
    if (Users) {
      let newUser = Users.filter((user) => user.id !== id);
      setUsers(newUser);
    }
  };

  const baseURL = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setUsers(response.data);
    });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ p: 2.5 }}
      >
        {Users.map((user) => (
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            key={user.id}
            className="card-grid"
            sx={{ p: 1 }}
          >
            <Card sx={{ p: 1 }}>
              <Stack className="card-avatar">
                <Link target="_blank" href={`https://www.${user?.website}`}>
                  <Avatar
                    alt="Ervin Howell"
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    sx={{ width: "7.5rem", height: "7.5rem" }}
                  />
                </Link>
              </Stack>

              <CardContent sx={{ p: 1.2 }}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="card-username"
                  >
                    {user?.name}
                  </Typography>
                  {user.toggled ? (
                    <Box sx={{ ml: 1, mt: 0.5 }}>
                      <IconStar size={18} />
                    </Box>
                  ) : null}
                </Stack>
                <Stack>
                  <Link
                    onClick={() => (window.location = `mailto:${user?.email}`)}
                    underline="hover"
                    color="text.secondary"
                    className="card-content"
                  >
                    <IconAt size={16} color="#868e96" /> {user?.email}
                  </Link>
                  <Link
                    onClick={() => window.open(`tel:${user?.phone}`)}
                    underline="hover"
                    color="text.secondary"
                    className="card-content"
                  >
                    <IconPhoneCall size={16} color="#868e96" />
                    {user?.phone}
                  </Link>
                  <Link
                    target="_blank"
                    href={`https://www.${user?.website}`}
                    underline="hover"
                    color="text.secondary"
                    className="card-content"
                  >
                    <IconWorld size={16} color="#868e96" /> {user?.website}
                  </Link>
                </Stack>
              </CardContent>
              <CardActions
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  id={`btn` + user.id}
                  variant={!user.toggled ? "contained" : "outlined"}
                  startIcon={
                    !user.toggled ? <IconUserPlus /> : <IconUserMinus />
                  }
                  fullWidth
                  className="card-btn"
                  onClick={() => handleFollow(user.id)}
                >
                  {!user.toggled ? "Follow" : "Unfollow"}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconTrash />}
                  fullWidth
                  className="card-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
