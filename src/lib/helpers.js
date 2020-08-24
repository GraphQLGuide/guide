export const withHyphens = (string) => string.replace(/ /g, '-')

// generate paths of the form:
// /Preface
// /Introduction
// /1-Understanding-GraphQL-through-REST/1-Introduction
export const slugify = (chapter, section) => {
  if (!section) {
    if (chapter.number !== null) {
      // default to the first section
      section = chapter.sections[0]
    } else {
      return '/' + withHyphens(chapter.title)
    }
  }

  const chapterSlug = chapter.number + '-' + withHyphens(chapter.title)
  const sectionSlug = section.number + '-' + withHyphens(section.title)
  return `/${chapterSlug}/${sectionSlug}`
}

// parse a path:
// /Introduction
// -> { chapterTitle: 'Introduction' }
//
// /1-Understanding-GraphQL-through-REST/1-Introduction
// -> { chapterNumber: 1, sectionNumber: 1 }
export const deslugify = (path) => {
  const [, chapterSlug, sectionSlug] = path.split('/')
  const chapterIsNumbered = !!sectionSlug

  return chapterIsNumbered
    ? {
        chapterNumber: parseInt(chapterSlug.split('-')[0], 10),
        sectionNumber: parseInt(sectionSlug.split('-')[0], 10),
      }
    : { chapterTitle: chapterSlug }
}
