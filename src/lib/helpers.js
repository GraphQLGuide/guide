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
