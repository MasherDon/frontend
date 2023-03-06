import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import Add from '../views/Add'
import receivedPas from '../views/received'
import NotFound from '../views/404'
import Region from '../views/region'
import Regions from '../views/regions'
import Reserves from '../views/reserves'
import Reserve from '../views/reserve'
import Animal from '../views/animal'
import Animals from '../views/animals'
import Profile from '../views/profile'
import {store} from '../store/index'
import AddArticle from "../views/addArticle"
import Article from "../views/article"
import UpArticle from "../views/upArticle"
import Articles from "../views/articles"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'add',
    component: Add,
  },
  {
    path: '/regions',
    name: 'regions',
    component: Regions,
  },
  {
    path: '/region/:Slog',
    name: 'region',
    component: Region,
  },
  {
    path: '/reserves',
    name: 'reserves',
    component: Reserves,
  },
  {
    path: '/reserve/:Slog',
    name: 'reserve',
    component: Reserve,
  },
  {
    path: '/animals',
    name: 'animals',
    component: Animals,
  },
  {
    path: '/animal/:Slog',
    name: 'animal',
    component: Animal,
  },
  {
    path: '/recovery/:email/:cod',
    name: 'recover',
    sensitive: true,
    component: receivedPas,
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/article/add/:tag',
    name: 'addArticle',
    component: AddArticle,
  },
  {
    path: '/article/up/:slug',
    name: 'upArticle',
    component: UpArticle,
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: Article,
  },
  {
    path: '/articles/:tag',
    name: 'articles',
    component: Articles,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.name === 'recover') {
    await toto(to.params,'/user/','email')? next( ) : next( { name: 'notfound' } )
  }
  if (to.name === 'add') {
    if (await store.state['user']['user'] !== null) {
      if (await store.state['user']['user']['rights'] > 1) {
        next({name: 'notfound'})
      }
    } else {
      next({name: 'notfound'})
    }
  }
  if (to.name === 'region') {
    await toto(to.params,'/region/','Slog')? next( ) : next( { name: 'notfound' } )
  }
  if (to.name === 'reserve') {
    await toto(to.params,'/reserve/','Slog')? next( ) : next( { name: 'notfound' } )
  }
  if (to.name === 'animal') {
    await toto(to.params,'/animal/','Slog')? next( ) : next( { name: 'notfound' } )
  }
  if (to.name === 'profile') {
    await toto(to.params,'/profile/','username')? next( ) : next( { name: 'notfound' } )
  }
  if (to.name === 'addArticle') {
    if (!localStorage.getItem('Authorization')) {
      next({name: 'notfound'})
    }
  }
  if (to.name === 'upArticle') {
    if (!localStorage.getItem('Authorization')) {
      next({name: 'notfound'})
    }
    await toto(to.params,'/article/','slug')? next( ) : next( { name: 'notfound' } )
  }
  if (to.name === 'article') {
    await toto(to.params,'/article/','slug')? next( ) : next( { name: 'notfound' } )
  }
  next()
})

export default router

const toto = async (to, put, par) => {
  try {
    const user = await fetch(`${store.state['site']['settings']['ip']}${put}${to[par]}`, {
      method: 'GET',
    });
    return user.status === 200
  } catch (error) {
    console.log(error)
  }
}
