import { Add, DateRangeOutlined, Remove } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import AlertModal from "../../components/AlertModal/AlertModal";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageLayout from "../../components/PageLayout/PageLayout";
import TransferList from "../../components/TransferList/TransferList";
import WarehousePicker from "../../components/WarehousePicker/WarehousePicker";
import useGetTaskGroups from "../../hooks/useGetTaskGroups";
import useGetUsers from "../../hooks/useGetUsers";
import usePostUpdateTaskGroups from "../../hooks/usePostUpdateTaskGroups";
import { APP_BAR_HEIGHT } from "../../styles/styles";

const TaskGroupPage = () => {
  const { postUpdateTaskGroups } = usePostUpdateTaskGroups();
  const { users, getUsers, selectedWarehouse } = useGetUsers();
  const { taskGroups, getTaskGroups } = useGetTaskGroups();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [listHeight, setListHeight] = useState(
    window.innerHeight - APP_BAR_HEIGHT - 40 - 135
  );

  const handleAddModalOpen = () => setIsAddModalOpen(true);

  const handleAddModalClose = () => setIsAddModalOpen(false);

  const handleRemoveModalOpen = () => setIsRemoveModalOpen(true);

  const handleRemoveModalClose = () => setIsRemoveModalOpen(false);

  const handleUserSelect = (i) => {
    if (selectedUsers.indexOf(users[i].userId) === -1) {
      selectedUsers.push(users[i].userId);
      setSelectedUsers([...selectedUsers]);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== users[i].userId));
    }
  };

  const handleUserSelectAll = () => {
    if (selectedUsers.length !== users.length) {
      setSelectedUsers(users.map(({ userId }) => userId));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleGroupSelect = (i) => {
    if (selectedGroups.indexOf(taskGroups[i].taskGroupId) === -1) {
      selectedGroups.push(taskGroups[i].taskGroupId);
      setSelectedGroups([...selectedGroups]);
    } else {
      setSelectedGroups(
        selectedGroups.filter(
          (taskGroupId) => taskGroupId !== taskGroups[i].taskGroupId
        )
      );
    }
  };

  const handleGroupSelectAll = () => {
    if (selectedGroups.length !== taskGroups.length) {
      setSelectedGroups(taskGroups.map(({ taskGroupId }) => taskGroupId));
    } else {
      setSelectedGroups([]);
    }
  };

  const handleResetAll = () => {
    setSelectedUsers([]);
    setSelectedGroups([]);
  };

  const handleAddTaskGroups = () => postUpdateTaskGroups(users, taskGroups);

  const handleRemoveTaskGroups = () => postUpdateTaskGroups(users, taskGroups, true);

  useEffect(() => {
    getUsers();
    getTaskGroups();
    handleResetAll();
  }, [selectedWarehouse]);

  useEffect(() => {
    const resizeListener = () =>
      setListHeight(window.innerHeight - APP_BAR_HEIGHT - 40 - 135);

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <PageLayout>
      <Grid container direction="column" pt={2} pl={5} pb={2} pr={3}>
        <Grid container alignItems="center" pb={3}>
          <WarehousePicker sx={{ mb: 0.5, mt: 0.5 }} />
          <Breadcrumbs icon={DateRangeOutlined} label="Task Group" sx={{ ml: 2 }} />
        </Grid>
        <Grid
          container
          spacing={4}
          mb={2}
          sx={(theme) => ({
            height: listHeight,
            [theme.breakpoints.down("sm")]: {
              height: 2 * listHeight,
            },
          })}
        >
          <Grid item xs={12} sm={6} sx={{ height: listHeight }}>
            <TransferList
              title="Select the user(s) you wish to manage task groups for"
              label="Users"
              renderBy="userId"
              valueBy="userId"
              height="90%"
              items={users}
              selected={selectedUsers}
              onSelect={handleUserSelect}
              onSelectAll={handleUserSelectAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ height: listHeight }}>
            <TransferList
              title="Select the task groups you wish to assign for selected users"
              label="Assigned Task Groups"
              renderBy="description"
              valueBy="taskGroupId"
              height="90%"
              items={taskGroups}
              selected={selectedGroups}
              onSelect={handleGroupSelect}
              onSelectAll={handleGroupSelectAll}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Remove />}
            onClick={handleRemoveModalOpen}
          >
            Remove Task Group
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={handleAddModalOpen}
          >
            Add Task Group
          </Button>
        </Grid>
      </Grid>
      <AlertModal
        isOpen={isAddModalOpen}
        title="PLEASE CONFIRM"
        actionLabel="Yes, I confirm to remove"
        onClose={handleAddModalClose}
        onAction={handleAddTaskGroups}
      >
        Please confirm if you wish to add the selected users to the selected task
        groups?
      </AlertModal>
      <AlertModal
        isOpen={isRemoveModalOpen}
        title="PLEASE CONFIRM"
        actionLabel="Yes, I confirm to remove"
        onClose={handleRemoveModalClose}
        onAction={handleRemoveTaskGroups}
      >
        Please confirm if you wish to remove the selected users from the selected
        task groups?
      </AlertModal>
    </PageLayout>
  );
};

export default TaskGroupPage;
