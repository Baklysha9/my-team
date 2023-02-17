import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import {useParams} from "react-router-dom";
import {baseURL} from "../constants/constants";
import axios from "axios";


export const FullPost = () => {
    const [data, setData] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const {id} = useParams();

    React.useEffect(() => {
        axios.get(baseURL + `/tasks/${id}`).then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch((err) => {
            console.warn(err);
            alert('Ошибка при получении статьи');
        })
    }, [])

    if(isLoading) {
        return <Post isLoading={isLoading} />;
    }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.image}
        user={data.user}
        createdAt={data.createdAt}
        project={data.project}
        isFullPost
      >
        <p>
            {data.description}
        </p>
      </Post>

    </>
  );
};
