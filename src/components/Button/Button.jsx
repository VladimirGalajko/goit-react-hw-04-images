
import { Btn } from './Button.styled';

export const Button = ({nextPage}) => {//{ children, type = 'button', onClick = null }
  return (
    <Btn type="button" onClick={nextPage}>
      {/* {children} */}
      Load More
    </Btn>
  );
};

////type={type} onClick={onClick}

