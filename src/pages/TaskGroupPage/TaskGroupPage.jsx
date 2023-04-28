import { Add, DateRangeOutlined } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageLayout from "../../components/PageLayout/PageLayout";
import TransferList from "../../components/TransferList/TransferList";
import WarehousePicker from "../../components/WarehousePicker/WarehousePicker";
import Modal from "../../components/Modal/Modal";

const items = ["List Item 1", "List Item 2", "List Item 3", "List Item 4"];

const TaskGroupPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleUserSelect = (i) => {
    if (selectedUsers.indexOf(items[i]) === -1) {
      selectedUsers.push(items[i]);
      setSelectedUsers([...selectedUsers]);
    } else {
      setSelectedUsers(selectedUsers.filter((item) => item !== items[i]));
    }
  };

  const handleUserSelectAll = () => {
    if (selectedUsers.length !== items.length) {
      setSelectedUsers([...items]);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleGroupSelect = (i) => {
    if (selectedGroups.indexOf(items[i]) === -1) {
      selectedGroups.push(items[i]);
      setSelectedGroups([...selectedGroups]);
    } else {
      setSelectedGroups(selectedGroups.filter((item) => item !== items[i]));
    }
  };

  const handleGroupSelectAll = () => {
    if (selectedGroups.length !== items.length) {
      setSelectedGroups([...items]);
    } else {
      setSelectedGroups([]);
    }
  };

  return (
    <PageLayout>
      <Modal
        isOpen={isOpen}
        title="PLEASE CONFIRM"
        onClose={handleToggle}
        titleProps={{
          sx: {
            pl: 3,
          },
        }}
        buttons={
          <Grid container pb={1} pl={2}>
            <Button variant="contained" onClick={handleToggle}>
              Yes, I confirm to remove
            </Button>
            <Button
              variant="contained"
              color="gray"
              sx={{ ml: 2 }}
              onClick={handleToggle}
            >
              Cancel
            </Button>
          </Grid>
        }
      >
        <Typography>
          Please confirm if you wish to remove the selected users from the selected
          task groups?
        </Typography>
      </Modal>
      <Grid container direction="column" pt={2} pl={5} pb={2} pr={3}>
        <Grid container alignItems="center" pb={3}>
          <WarehousePicker sx={{ mb: 0.5, mt: 0.5 }} />
          <Breadcrumbs icon={DateRangeOutlined} label="Task Group" sx={{ ml: 2 }} />
        </Grid>
        <Grid container spacing={4} mb={2}>
          <Grid item xs={12} sm={6}>
            <TransferList
              title="Select the user(s) you wish to manage task groups for"
              label="Users"
              items={items}
              selected={selectedUsers}
              onSelect={handleUserSelect}
              onSelectAll={handleUserSelectAll}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TransferList
              title="Select the task groups you wish to assign for selected users"
              label="Assigned Task Groups"
              items={items}
              selected={selectedGroups}
              onSelect={handleGroupSelect}
              onSelectAll={handleGroupSelectAll}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" gap={2}>
          <Button variant="contained" startIcon={<Add />} onClick={handleToggle}>
            Add Task Group
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={handleToggle}
          >
            Assign Task Group
          </Button>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default TaskGroupPage;
