import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Grid, Button, Container, Stack } from '@mui/material';
// utils
//import axios from '../../../utils/axios';
import axios from 'axios';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import { SkeletonPostItem } from '../../../components/skeleton';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../../sections/@dashboard/blog 2';
//config
import { nameApp,API_ROOT } from 'src/config-global';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

BlogPostsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogPostsPage() {
  const API_GET_POSTS = API_ROOT + "rental/posts/";



  const { themeStretch } = useSettingsContext();

  const [posts, setPosts] = useState([]);

  const [sortBy, setSortBy] = useState('latest');

  const sortedPosts = applySortBy(posts, sortBy);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get(API_GET_POSTS);
      setPosts(response.data.data);
      console.log(posts)
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);


  return (
    <>
      <Head>
        <title> Bài viết: Tìm việc | {nameApp}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Bài viết"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Bài tìm việc',
              href: PATH_DASHBOARD.blog2.posts,
            },
            {
              name: 'Tất cả bài tìm việc',
            },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.blog2.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Bài viết mới
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
        </Stack>

        <Grid container spacing={3}>
          {(!posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <BlogPostCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const applySortBy = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};
