import React, { useState } from "react";
import {
  Badge,
  Box,
  IconButton,
  Popper,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Loading, useDataProvider, useGetList } from "react-admin";

export default function DescriptionAlerts() {
  const [refresh, setRefresh] = useState(0);
  const [showAll, setshowAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dataProvider = useDataProvider();

  const { data, total, isLoading } = useGetList("notificaciones", {
    pagination: { page: 1, perPage: 50 },
    filter: { todos: showAll },
  });
  if (isLoading) {
    return <Loading />;
  }

  const toggleNotificationCenter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleFilter = (_: React.ChangeEvent) => {
    setshowAll(!showAll);
  };

  const handleRecordClick = async (record) => {
    try {
      await dataProvider.update("notificaciones", {
        id: record.id,
        data: { ...record, visto: !record.visto },
      });

      setRefresh(refresh + 1);
      console.log(refresh);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton size="large" onClick={toggleNotificationCenter}>
        <Badge badgeContent={total} color="primary">
          <MailIcon color="action" />
        </Badge>
      </IconButton>

      <Popper
        key={refresh}
        open={isOpen}
        anchorEl={anchorEl}
        placement="bottom"
        sx={{
          zIndex: (theme) => theme.zIndex.tooltip,
        }}
      >
        <Box>
          <Box
            sx={{
              background: "#666",
              padding: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="#fff">
              Notificaciones
            </Typography>
            <FormGroup sx={{ color: "#fff" }}>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    onChange={toggleFilter}
                    checked={showAll}
                  />
                }
                labelPlacement="top"
                label="Mostrar Todos"
              />
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 300,
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {data != undefined &&
                data.map((record) => {
                  return (
                    <ListItem
                      key={record.id}
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="Visto"
                          onClick={() => handleRecordClick(record)}
                        >
                          {!record.visto && <RadioButtonUncheckedIcon />}
                          {record.visto && <CheckCircleOutlineIcon />}
                        </IconButton>
                      }
                    >
                      <ListItemButton>
                        <ListItemText
                          primary={record.mensaje}
                          secondary={record.fecha_creacion}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        </Box>
      </Popper>
    </>
  );
}
