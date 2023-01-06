import { FC } from 'react';
import { Button, Stack, Text } from '@mantine/core';
import { IconBrandGithub, IconEdit } from '@tabler/icons';
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';

export const SuggestsEditsButton: FC = () => {
  const { pathname } = useRouter();
  const plausible = usePlausible();

  return (
    <Stack justify="center">
      <a
        href={`https://github.com/KevinVandy/mantine-react-table/edit/main/apps/mantine-react-table-docs/pages${pathname}${
          ['/'].includes(pathname)
            ? 'index.tsx'
            : ['/docs', '/docs/api', '/docs/examples', '/docs/guides'].includes(
                pathname,
              )
            ? '/index.mdx'
            : '.mdx'
        }`}
        rel="noreferrer"
        target="_blank"
        style={{ margin: '3rem auto' }}
      >
        <Button
          color="secondary"
          rightIcon={<IconBrandGithub />}
          leftIcon={<IconEdit />}
          onClick={() => plausible('edit-on-github')}
          sx={{
            height: '3rem',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          variant="outline"
        >
          Suggest an Edit for this page on GitHub
        </Button>
      </a>
      <Text
        sx={{
          justifyContent: 'center',
          display: 'flex',
          alignContent: 'center',
        }}
      >
        You can help make these docs better!{' '}
        <a
          aria-label="Learn how to contribute"
          href="http://makeapullrequest.com"
          target="_blank"
          rel="noreferrer"
          style={{ marginLeft: '0.5rem' }}
        >
          <img
            alt="PRs are Welcome"
            src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"
          />
        </a>
      </Text>
    </Stack>
  );
};
