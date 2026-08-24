export interface ICategory {
    id: number
    name: string
    slug: string
    parentCategoryId: number | null
    subCategories: ICategory[]
}
