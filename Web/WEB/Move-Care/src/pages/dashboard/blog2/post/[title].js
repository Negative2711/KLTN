import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Stack, Container, Typography, Button, TextField } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import axios from 'axios';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Markdown from '../../../../components/markdown';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { SkeletonPostDetails } from '../../../../components/skeleton';
// sections
import { BlogPostHero, BlogPostTags, BlogPostCard } from '../../../../sections/@dashboard/blog';

// config
import { nameApp, API_ROOT, linkIcon } from 'src/config-global';

// ----------------------------------------------------------------------

BlogPostPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { title },
  } = useRouter();
  const id = title;

  const API_GET_POST_DETAIL = API_ROOT + 'rental/post/detail/' + id + '/';
  const API_DUYET_BAI = API_ROOT + 'rental/post/approve/' + id + '/';
  const API_TUCHOI_BAI = API_ROOT + 'rental/post/reject/' + id + '/'; // Assuming you have this endpoint for rejection

  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [reason, setReason] = useState(''); // State to manage the reason

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(API_GET_POST_DETAIL);
      setPost(response.data.data);
      console.log(response.data);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
      setErrorMsg(error.message);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [getPost, id]);

  const handleDuyet = async () => {
    try {
      const response = await axios.get(API_DUYET_BAI);
      setPost(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTuChoi = async () => {
    try {
      const response = await axios.get(API_TUCHOI_BAI, { reason });
      console.log(response.data);
      // Handle the response if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>{`Blog: ${post?.tieu_de || ''} | ${nameApp}`}</title>
        <link rel="icon" type="image/png" href={linkIcon} />
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Chi tiết bài thuê"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Bài thuê',
              href: PATH_DASHBOARD.blog2.root,
            },
            {
              name: post?.tieu_de,
            },
          ]}
        />

        {post && (
          <Stack
            sx={{
              borderRadius: 2,
              boxShadow: (theme) => ({
                md: theme.customShadows.card,
              }),
            }}
          >
            <BlogPostHero post={post} />
            <Typography
              variant="h6"
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              {post.description}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                px: { md: 5 },
              }}
            >
              description: {post.chi_tiet}
            </Typography>
            <Markdown
              children={post.body}
              sx={{
                px: { md: 5 },
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              <Typography variant="body1">Trạng thái:</Typography>
              <Stack
                variant="body1"
                sx={{
                  color: post.da_duyet ? '#4CAF50' : '#f44336',
                }}
                direction="row"
                alignItems="center"
              >
                <span>{post.da_duyet ? 'Đã được duyệt' : 'Chưa duyệt'}</span>
              </Stack>
            </Stack>
            <Stack
              spacing={3}
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              <Divider />
              <BlogPostTags post={post} />
              <Divider />
            </Stack>
            <Stack
              sx={{
                px: { md: 5 },
              }}
            >
              <Divider sx={{ mt: 5, mb: 2 }} />
            </Stack>
            <Stack
              spacing={2}
              sx={{
                px: { md: 5 },
                py: 2,
              }}
            >
              <Button onClick={handleDuyet} variant="contained" color="primary">
                Duyệt bài
              </Button>
            </Stack>
            <Stack
              spacing={2}
              sx={{
                px: { md: 5 },
                py: 2,
              }}
            >
              <TextField
                label="Lý do từ chối"
                variant="outlined"
                fullWidth
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                multiline
                rows={4}
              />
              <Button onClick={handleTuChoi} variant="contained" color="error">
                Từ chối
              </Button>
            </Stack>
          </Stack>
        )}

        {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingPost && <SkeletonPostDetails />}
      </Container>
    </>
  );
}
