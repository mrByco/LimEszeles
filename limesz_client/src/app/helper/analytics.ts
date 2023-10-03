import { AnalyticsService } from "../services/analytics.service";

export class ANALYTICS {

    static AnalyticsCategoryView(categoryId: string) {
        try {
            AnalyticsService.instance.RecordCategoryView(categoryId);
        } catch (e) {
            console.error(e);
        }
    }

    static AnalyticsPageView(pageCode: string) {
        try {
            AnalyticsService.instance.RecordPageView(pageCode);
        } catch (e) {
            console.error(e);
        }
    }
}
