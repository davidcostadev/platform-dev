import path from 'path';
import { Router } from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from '../graphql';
import { ValidateRequest, GetTeamById } from '../Auth';
import * as auth from '../Auth';

const router = Router();

const resolveDir = dir => path.join(__dirname, '..', `./client/${dir}.html`)

router.get('/', (req, res) => {
  res.sendFile(resolveDir('Home'), { name: 'TEAM NAME' });
});

router.use('/graphql', graphqlHTTP({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  graphiql: true,
}));

router.get('/register', (req, res) => {
  res.sendFile(resolveDir('Register'));
});

router.get('/team', async (req, res) => {
  const teamId = req.query.id;
  const editKey = req.query.edit;
  const viewKey = req.query.view;
  const keysAuth = await ValidateRequest(teamId, editKey, viewKey);

  if (!keysAuth.canEdit && !keysAuth.canView)
    res.redirect('/');

  res.sendFile(resolveDir('team/index'));
});

router.get('/login', async (req, res) => {
  if (req.query.config) {
    const config = JSON.parse(decodeURIComponent(req.query.config));
    const register = await auth.RegisterUser(config.user, config.subscription);

    if (register) {
      const { id, editKey, viewKey } = register;
      
      if (editKey)
        res.redirect(`/team?id=${id}&edit=${editKey}`);
      else
        res.redirect(`/team?id=${id}&view=${viewKey}`);
    }
  } else {
    res.redirect('/');
  }
});

export default router;
