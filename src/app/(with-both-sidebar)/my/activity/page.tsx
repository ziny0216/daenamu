'use client';

import React, { useState } from 'react';
import TabList from '@/components/common/TabList';
import { DefaultObj } from '@/types/components/common';
import CommentItem from '@/components/module/Comment/CommentItem';

const tabMok: DefaultObj[] = [
  { name: '좋아요한 글', value: 'post' },
  { name: '작성한 댓글', value: 'comment' },
];

const dataMok = {
  comment: '1111',
  created_at: '2024-05-06',
  id: 123,
  post_id: '123123',
  user_id: '1q23123',
  user: null,
};
export default function Page() {
  const [tab, setTab] = useState('post');
  const handTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className="inner flex-col">
      <TabList tabList={tabMok} onChange={handTabChange} />
      {/*<div>{tab === 'post' ? <PostItem type={'list'} /> : <CommentItem />}</div>*/}
      <div>{tab === 'post' && <CommentItem comment={dataMok} />}</div>
    </div>
  );
}
