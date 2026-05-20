from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Course, Submission
from .models import Course, Submission, Choice

@login_required
def show_exam_result(request, course_id):

    course = get_object_or_404(Course, pk=course_id)

    submission = Submission.objects.filter(
        enrollment__user=request.user,
        enrollment__course=course
    ).last()

    choices = submission.choices.all()

    selected_ids = []

    for choice in choices:
        selected_ids.append(choice.id)

    total_score = 0
    possible_score = 0

    for question in course.question_set.all():

        possible_score += question.grade

        if question.is_get_score(selected_ids):
            total_score += question.grade

    grade = round(total_score / possible_score * 100, 2)

    context = {
        'course': course,
        'submission': submission,
        'grade': grade,
        'selected_ids': selected_ids,
    }

    return render(
        request,
        'onlinecourse/exam_result_bootstrap.html',
        context
    )
    @login_required
def submit(request, course_id):

    course = get_object_or_404(Course, pk=course_id)

    enrollment = request.user.enrollment_set.get(course=course)

    submission = Submission.objects.create(
        enrollment=enrollment
    )

    choices = request.POST.getlist('choice')

    for choice_id in choices:
        choice = Choice.objects.get(pk=int(choice_id))
        submission.choices.add(choice)

    return show_exam_result(request, course_id)
