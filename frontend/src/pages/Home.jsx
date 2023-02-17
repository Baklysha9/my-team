import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from "axios";
import {baseURL} from "../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {fetchProjects, fetchTasks} from "../redux/slices/tasks";

export const Home = () => {
    const dispatch = useDispatch();
    const {tasks, projects} = useSelector(state => state.tasks);

    const isTasksLoading = tasks.status === 'loading';
    const isProjectsLoading = projects.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchTasks())
        dispatch(fetchProjects())
    }, [])
  return (
    <>
    <h2>Задачи:</h2>
      <Grid container spacing={4}>
        <Grid xs={12} md={8} item>
          {(isTasksLoading ? [...Array(5)]: tasks.items).map((obj, index) =>
              isTasksLoading ? (<Post key={index} isLoading={true}/>):
              (
            <Post
              _id={obj._id}
              title={obj.title}
              imageUrl={obj.image}
              user={obj.user}
              createdAt={obj.createdAt}
              project={obj.project}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={12} md={4} item>
          <TagsBlock items={projects.items } isLoading={isProjectsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
        </>
  );
};
