import * as S from './styles'

const Checkbox = ({ children, ...rest }) => (
  <S.CheckboxContainer>
    {children}
    <S.CheckboxElement type="checkbox" />
    <S.Checkmark />
  </S.CheckboxContainer>
)

export default Checkbox
