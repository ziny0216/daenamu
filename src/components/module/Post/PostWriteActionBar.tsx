import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';

export default function PostWriteActionBar() {
  console.log('111');
  return (
    <div>
      <Button size={'sm'} isIcon></Button>
      <Checkbox />
      <Button disabled size={'sm'} title={'POST'}></Button>
    </div>
  );
}
