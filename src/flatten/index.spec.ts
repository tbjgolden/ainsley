import { Ainsley, AinsleyChild } from '../types'
import { flatten } from '.'

describe('flatten', () => {
  test('invalid config', async () => {
    await flatten((null as unknown) as Ainsley)
      .then(() => {
        expect(1).toBe(2)
      })
      .catch((err) => {
        expect(err.message).toMatch(/^Invalid input Ainsley:/)
      })
  })

  test('mock getConfig', async () => {
    const start: Ainsley = {
      children: ['$not-a-real-config', 'body{margin:0}']
    }

    const mockGetConfig = async (ref: string): Promise<AinsleyChild> => {
      await Promise.resolve()
      if (ref === 'not-a-real-config') {
        return {
          children: ['$also-not-a-real-config', '.h1{font-size:69px}']
        }
      } else if (ref === 'also-not-a-real-config') {
        return {
          children: ['*{box-sizing:border-box}']
        }
      }
      return `/* $${ref} */`
    }

    expect(
      await flatten(
        {
          children: ['$missing-config', 'body{margin:0}']
        },
        mockGetConfig
      )
    ).toEqual({
      children: ['/* $missing-config */', 'body{margin:0}']
    })
    expect(await flatten(start, mockGetConfig)).toEqual({
      children: [
        {
          children: [
            { children: ['*{box-sizing:border-box}'] },
            '.h1{font-size:69px}'
          ]
        },
        'body{margin:0}'
      ]
    })
  })

  test('default getConfig', async () => {
    expect(
      await flatten({
        children: [
          '$https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css',
          'body{margin:0}'
        ]
      })
    ).toEqual({
      children: [
        "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}",
        'body{margin:0}'
      ]
    })

    expect(
      await flatten({
        children: ['$starter', 'body{margin:0}']
      })
    ).toEqual({
      children: [
        (await import('ainsley-config-starter')).config,
        'body{margin:0}'
      ]
    })
  })
})
