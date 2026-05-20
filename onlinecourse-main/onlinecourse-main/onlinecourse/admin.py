from django.contrib import admin
from .models import Course
from .models import Lesson
from .models import Enrollment
from .models import Question
from .models import Choice
from .models import Submission
from .models import Instructor
from .models import Learner

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 2

class LessonAdmin(admin.ModelAdmin):
    list_display = ['title']

class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ['question_text']

class CourseAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_filter = ['name']
    search_fields = ['name']

admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Enrollment)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Submission)
admin.site.register(Instructor)
admin.site.register(Learner)
