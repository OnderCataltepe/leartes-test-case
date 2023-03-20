import styles from './checkBox.module.scss';
interface CProps {
  item: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckBox = ({ item, checked, onChange }: CProps): JSX.Element => {
  return (
    <label className={styles.container}>
      <input type="checkbox" name={item} checked={checked || false} onChange={onChange} />
      {item}
    </label>
  );
};

export default CheckBox;
