import db from '../database/connection';
import bcrypt from 'bcrypt';

interface Login {
  email: string;
  password: string;
}

const checkLogin = async ({
  email,
  password,
}: Login) => {
  const [account] = await db('users')
    .select(['name', 'avatar', 'id', 'password', 'jwtVersion'])
    .where('users.email', '=', email);

  const ERROR_MESSAGE = 'Senha ou e-mail incorretos';
  if (!account) throw ERROR_MESSAGE;
  
  const { password: dbPassword, jwtVersion, ...rest } = account;

  const match = bcrypt.compareSync(password, dbPassword);
  if (!match) throw ERROR_MESSAGE;
  
  return { account: rest, jwtVersion };
};

export default checkLogin;
