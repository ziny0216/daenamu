'use client';

import React, { useState } from 'react';
import TabList from '@/components/common/TabList';
import { DefaultObj } from '@/types/components/common';

const tabMok: DefaultObj[] = [
  { name: '좋아요한 글', value: 'post' },
  { name: '작성한 댓글', value: 'comment' },
];
export default function Page() {
  const [tab, setTab] = useState('post');
  const handTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className="inner flex-col">
      <TabList tabList={tabMok} onChange={handTabChange} />
      {/*<div>{tab === 'post' ? <PostItem type={'list'} /> : <CommentItem />}</div>*/}
    </div>
  );
}
